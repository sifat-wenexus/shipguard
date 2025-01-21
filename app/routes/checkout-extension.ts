import { json, LoaderFunction } from '@remix-run/node';
import { findOfflineSession } from '~/modules/find-offline-session.server';
import { prisma } from '~/modules/prisma.server';
import { PRODUCT_SKU } from '~/routes/settings.widget-setup/modules/package-protection-listener.server';
import { getShopifyGQLClient } from '~/modules/shopify.server';

export const loader: LoaderFunction = async ({ request }) => {
  const params = new URL(request.url);
  const queryParams = Object.fromEntries(params.searchParams.entries());
  const session = await findOfflineSession(queryParams.shopUrl);
  if (!session) {
    throw new Error(`Session not found!`);
  }
  const gql = getShopifyGQLClient(session);
  const getVariantWithProductId = async (productId: string) => {
    const result = await gql.query<any>({
      data: {
        query: `
          #graphql
          query {
            product(id: "${productId}") {
              variants(first: 250){
                nodes {
                  id
                  price
                }
              }
            }
          }
        `,
      },
    });
    const productData = result.body.data;
    if (!productData || !productData.product || !productData.product.variants) {
      throw new Error('Invalid product data structure.');
    }

    // Extract variants
    const variants = productData.product.variants.nodes;

    // Map and return only id and price
    return variants.map((variant) => ({
      id: variant.id,
      price: variant.price,
    }));
  };

  const data = await prisma.packageProtection.findFirst({
    where: { storeId: session.storeId },
    include: {
      excludedPackageProtectionProducts: {
        include: { excludedPackageProtectionVariants: true },
      },
    },
  });

  let totalAmount;
  let hide = false;

  const excludedItems = data?.excludedPackageProtectionProducts.flatMap(
    (item) => item.excludedPackageProtectionVariants
  );

  if (excludedItems && excludedItems?.length > 0) {
    const cartLine = queryParams.cartLine
      ? JSON.parse(queryParams.cartLine)
      : null;

    const removeExclude = cartLine
      .filter((item) => item.merchandise.sku !== PRODUCT_SKU)
      ?.filter(
        (line) => !excludedItems.some((item) => item.id === line.merchandise.id)
      )
      .reduce((sum, item) => sum + item.cost.totalAmount.amount, 0);
    totalAmount = removeExclude;
    if (removeExclude === 0) {
      hide = true;
    }
  } else {
    totalAmount = queryParams.total;
  }

  let variantId: string = '';
  let variantPrice: any = 0.0;
  if (data?.insurancePriceType === 'FIXED_PRICE') {
    const variants = await getVariantWithProductId(data.fixedProductId!);
    variantId = variants[0].id!;
    variantPrice = variants[0].price!;
  }
  if (data?.insurancePriceType === 'FIXED_MULTIPLE') {
    function getProtectionFees(totalAmount) {
      const fixedMultiplePlanArray = (data?.fixedMultiplePlan || []) as Array<{
        cartMaxPrice: string;
        cartMinPrice: string;
        protectionFees: string;
      }>;

      const rule = fixedMultiplePlanArray?.find(
        (rule) =>
          totalAmount >= parseFloat(rule.cartMinPrice) &&
          totalAmount <= parseFloat(rule.cartMaxPrice)
      );

      if (rule) {
        return rule.protectionFees;
      } else {
        return null;

      }
    }

    const fixedMultipleAmount = getProtectionFees(totalAmount);
    if (fixedMultipleAmount) {
      const variants = await getVariantWithProductId(data.fixedProductId!);
      const variant=variants.find(
        (variant) => Number(variant.price) === Number(fixedMultipleAmount)
      )

      variantId = variant?.id;
      variantPrice = variant?.price;
    } else {
      hide = true;
    }
  }
  let v: any = [];
  if (data?.insurancePriceType === 'PERCENTAGE') {

    const variants1 = await getVariantWithProductId(data.percentageProductId!);
    const variants = variants1.sort(
      (a: any, b: any) => a.price - b.price
    );
    const percentValue = (Number(totalAmount) * data.percentage) / 100;

    if (variants && variants?.length > 0) {
      if (percentValue < Number(variants[0].price)) {
        variantId = variants[0].id!;
        variantPrice = variants[0].price!;
      } else if (percentValue > Number(variants[variants.length - 1].price)) {
        variantId = variants[variants.length - 1].id!;
        variantPrice = variants[variants.length - 1].price!;
      } else {
        const variant = variants?.find((v) => Number(v.price) >= percentValue);
        variantId = variant?.id;
        variantPrice = variant?.price;
        v = variant;
      }
    }
  }
  if (data?.insurancePriceType === 'NOT_SELECTED') {
    hide = true;
  }

  return json(
    {
      message: 'Response',
      data,
      variantId: variantId,
      variantPrice: variantPrice,
      totalAmount,
      hide,
      v,
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }
  );
};
