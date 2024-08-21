import React, { useCallback, useState } from 'react';
import {
  AppProvider,
  Page,
  Card,
  ResourceList,
  ResourceItem,
  Button,
  Badge,
  Text,
} from '@shopify/polaris';
function ResourceListExample() {
  const [selected, setSelected] = useState([]);
  const handleSelectionChange = useCallback(
    (selectedItems) => setSelected(selectedItems),
    []
  );

  const items = [
    {
      id: '1',
      title: '10 PIECE HORIZONTAL BANGER HOLDER',
      available: '0 available',
      price: '$44.99',
    },
    {
      id: '2',
      title: '10IN CANDY COLORED STRAIGHT TUBE DAB RIG',
      variants: [
        { color: 'Blue', available: '4 available', price: '$49.99' },
        { color: 'Green', available: '7 available', price: '$49.99' },
        { color: 'Red', available: '8 available', price: '$49.99' },
      ],
    },
  ];
  return <Page title="Product List"></Page>;
}

export default ResourceListExample;

// ------------------------------------------

// import { ResourceSelect } from '~/components/resource-select';
// import type { FC, PropsWithChildren } from 'react';
// import * as Icons from '@shopify/polaris-icons';
// import { useI18n } from '@shopify/react-i18n';
// import type { Prisma } from '#prisma-client';
// import React, { useCallback } from 'react';

// import type {
//   FilterValues,
//   GetSearchConditions,
//   ResourceItem,
//   ResourceSelectProps,
// } from '~/components/resource-select';
// import { ResourceList, InlineStack, Thumbnail, Text } from '@shopify/polaris';

// export interface ProductVariantSelectProps extends PropsWithChildren {
//   innerWrapperElement?: ResourceSelectProps<'productVariant'>['innerWrapperElement'];
//   disabledIds?: ResourceSelectProps<'productVariant'>['disabledIds'];
//   className?: ResourceSelectProps<'productVariant'>['className'];
//   onChange: ResourceSelectProps<'productVariant'>['onChange'];
//   value: ResourceSelectProps<'productVariant'>['value'];
//   where?: FilterValues<'productVariant'>;
//   selectedItem?: string[];
//   searchValue?: string;
//   showProduct: boolean;
//   selectAll?: boolean;
//   multiple?: boolean;
//   verb?: string;
// }

// const ProductVariant: React.FC<{
//   item: ResourceItem<'productVariant'>;
//   onClick: (id: string) => void;
// }> = ({ item, onClick }) => {
//   const [i18n] = useI18n();

//   return (
//     <ResourceList.Item
//       verticalAlignment="center"
//       onClick={onClick}
//       name={item.title}
//       id={item.id}
//       media={
//         <Thumbnail
//           source={item.featuredImage ? item.featuredImage : Icons.VariantIcon}
//           alt={item.title}
//           size="small"
//         />
//       }
//     >
//       <InlineStack align="space-between" blockAlign="center" wrap>
//         <Text as="p">{item.title}</Text>
//         <Text as="p" variant="bodySm" tone="subdued">
//           {item.inventoryQuantity} in stock
//         </Text>

//         <Text as="p" numeric>
//           <Text as="span">{i18n.formatCurrency(Number(item.price))}</Text>
//           &nbsp;&nbsp;
//           {item.compareAtPrice && item.compareAtPrice > item.price ? (
//             <Text
//               as="span"
//               variant="bodySm"
//               textDecorationLine="line-through"
//               tone="critical"
//             >
//               {i18n.formatCurrency(Number(item.compareAtPrice))}
//             </Text>
//           ) : null}
//         </Text>
//       </InlineStack>
//     </ResourceList.Item>
//   );
// };

// const Product: React.FC<{
//   item: {
//     Variants: ResourceItem<'productVariant'>[];
//   } & ResourceItem<'product'>;
//   onClick: (id: string) => void;
// }> = ({ item, onClick }) => {
//   const [i18n] = useI18n();
//   // return <NestedResourceList data={item} />;
//   return (
//     <ResourceList.Item
//       verticalAlignment="leading"
//       onClick={onClick}
//       name={item.title}
//       id={item.id}
//       media={
//         <Thumbnail
//           source={item.featuredImage ? item.featuredImage : Icons.VariantIcon}
//           alt={item.title}
//           size="small"
//         />
//       }
//     >
//       <div className="mb-3 font-semibold">
//         <Text as="p">{item.title}</Text>
//       </div>
//       <ResourceList
//         items={item.Variants}
//         selectable
//         // selectedItems={'All'}
//         // onSelectionChange={(e) => console.log('event', e)}
//         renderItem={(item) => {
//           const { id, title, price, inventoryQuantity, compareAtPrice } = item;

//           return (
//             <ResourceList.Item
//               id={id}
//               name={title}
//               onClick={(e) => console.log('e', e)}
//             >
//               <InlineStack align="space-between" blockAlign="center" wrap>
//                 <Text as="p">{title}</Text>
//                 <Text as="p" variant="bodySm" tone="subdued">
//                   {inventoryQuantity} in stock
//                 </Text>

//                 <Text as="p" numeric>
//                   <Text as="span">{i18n.formatCurrency(Number(price))}</Text>
//                   &nbsp;&nbsp;
//                   {compareAtPrice && compareAtPrice > price ? (
//                     <Text
//                       as="span"
//                       variant="bodySm"
//                       textDecorationLine="line-through"
//                       tone="critical"
//                     >
//                       {i18n.formatCurrency(Number(compareAtPrice))}
//                     </Text>
//                   ) : null}
//                 </Text>
//               </InlineStack>
//             </ResourceList.Item>
//           );
//         }}
//       />

//       {/* ------------------------------------------------------- */}
//       {/* {item.Variants.map((variant) => (
//         <>
//           {variant.sku ? (
//             <div
//               className="mt-2 wenexus-tree-view-ResourceList"
//               key={variant.id}
//             >
//               <Divider />
//               <ResourceList.Item
//                 onClick={onClick}
//                 name={variant.title}
//                 id={variant.id}
//               >
//                 <InlineStack align="space-between" blockAlign="center" wrap>
//                   <Text as="p">{variant.title}</Text>
//                   <Text as="p" variant="bodySm" tone="subdued">
//                     {variant.inventoryQuantity} in stock
//                   </Text>

//                   <Text as="p" numeric>
//                     <Text as="span">
//                       {i18n.formatCurrency(Number(variant.price))}
//                     </Text>
//                     &nbsp;&nbsp;
//                     {variant.compareAtPrice &&
//                     variant.compareAtPrice > variant.price ? (
//                       <Text
//                         as="span"
//                         variant="bodySm"
//                         textDecorationLine="line-through"
//                         tone="critical"
//                       >
//                         {i18n.formatCurrency(Number(variant.compareAtPrice))}
//                       </Text>
//                     ) : null}
//                   </Text>
//                 </InlineStack>
//               </ResourceList.Item>
//             </div>
//           ) : null}
//         </>
//       ))} */}
//     </ResourceList.Item>
//   );
// };

// export const ProductVariantSelect: FC<ProductVariantSelectProps> = ({
//   children,
//   ...props
// }) => {
//   const getSearchConditions = useCallback((search: string) => {
//     const stringFilter: Prisma.StringFilter = {
//       contains: search,
//       mode: 'insensitive',
//     };

//     const productFilters = [
//       { title: stringFilter },
//       { productType: stringFilter },
//       { vendor: stringFilter },
//       { tags: { hasSome: [search] } },
//       { handle: stringFilter },
//       { Collections: { some: { title: stringFilter } } },
//     ] satisfies FilterValues<'product'>[];

//     const variantFilters = [
//       { title: stringFilter },
//       { sku: stringFilter },
//     ] satisfies FilterValues<'productVariant'>[];

//     if (!props.showProduct) {
//       return {
//         OR: [
//           ...variantFilters,
//           {
//             Product: {
//               OR: productFilters,
//             },
//           },
//         ],
//       } satisfies FilterValues<'productVariant'>;
//     }

//     return {
//       OR: [
//         ...productFilters,
//         {
//           Variants: {
//             some: {
//               OR: variantFilters,
//             },
//           },
//         },
//       ],
//     } satisfies FilterValues<'product'>;
//   }, []);

//   if (!props.showProduct) {
//     return (
//       <ResourceSelect
//         innerWrapperElement={props.innerWrapperElement}
//         selectedItem={props.selectedItem}
//         searchValue={props.searchValue}
//         verb={props.verb ?? 'Select'}
//         args={{ where: props.where }}
//         selectAll={props.selectAll}
//         className={props.className}
//         getId={(item) => item.id}
//         resource="productVariant"
//         multiple={props.multiple}
//         onChange={props.onChange}
//         value={props.value}
//         getSearchConditions={
//           getSearchConditions as GetSearchConditions<'productVariant'>
//         }
//         renderItem={(item, onClick) => (
//           <ProductVariant item={item} onClick={onClick} />
//         )}
//         resourceName={{
//           plural: 'Product Variants',
//           singular: 'Product Variant',
//         }}
//       >
//         {children}
//       </ResourceSelect>
//     );
//   }

//   return (
//     <ResourceSelect
//       getId={(item) => item.id}
//       innerWrapperElement={props.innerWrapperElement}
//       selectedItem={props.selectedItem}
//       searchValue={props.searchValue}
//       verb={props.verb ?? 'Select'}
//       selectAll={props.selectAll}
//       className={props.className}
//       resource="product"
//       multiple={props.multiple}
//       onChange={props.onChange}
//       value={props.value}
//       getSearchConditions={
//         getSearchConditions as GetSearchConditions<'product'>
//       }
//       renderItem={(item, onClick) => <Product item={item} onClick={onClick} />}
//       resourceName={{
//         plural: 'Products and Variant',
//         singular: 'Variant',
//       }}
//       args={{
//         where: {
//           Variants: {
//             some: props.where,
//           },
//         },
//         include: { Variants: true },
//       }}
//     >
//       {children}
//     </ResourceSelect>
//   );
// };
