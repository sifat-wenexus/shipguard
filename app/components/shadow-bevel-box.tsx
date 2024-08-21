import { Box, Divider, InlineStack, Text } from '@shopify/polaris';
import type { Icon, BoxProps } from '@shopify/polaris';
import type { FC, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren, BoxProps {
  title?: string;
  icon?: ReturnType<typeof Icon>;
  className?: string;
  divider?: boolean;
  dividerBoxProps?: BoxProps;
  actions?: React.ReactNode;
}

export const ShadowBevelBox: FC<Props> = ({
  children,
  title,
  icon,
  divider = true,
  className,
  dividerBoxProps,
  actions,
  ...rest
}) => {
  const boxProps: BoxProps = {
    paddingBlockStart: '400',
    paddingBlockEnd: '400',
    paddingInlineStart: '400',
    paddingInlineEnd: '400',
    background: 'bg-surface',
    as: 'section',
    ...rest,
  };

  const _dividerBoxProps: BoxProps = {
    paddingBlockStart: '400',
    paddingBlockEnd: '400',
    ...dividerBoxProps,
  };

  return (
    <div
      className={`Polaris-ShadowBevel${className ? ` ${className}` : ''}`}
      style={
        {
          '--pc-shadow-bevel-z-index': '32',
          '--pc-shadow-bevel-content-xs': '',
          '--pc-shadow-bevel-box-shadow-xs': 'var(--p-shadow-100)',
          '--pc-shadow-bevel-border-radius-xs': 'var(--p-border-radius-300)',
        } as any
      }
    >
      <Box {...boxProps}>
        {title || actions ? (
          <InlineStack align="space-between" blockAlign="center" wrap>
            {title ? (
              <InlineStack align="center" gap="100" wrap>
                {icon ? icon : null}

                <Text as="h3" fontWeight="semibold" variant="headingMd">
                  {title}
                </Text>
              </InlineStack>
            ) : null}

            {actions ? (
              <InlineStack gap="100" align="end" blockAlign="center">
                {actions}
              </InlineStack>
            ) : null}
          </InlineStack>
        ) : null}

        {divider ? (
          <Box {..._dividerBoxProps}>
            <Divider />
          </Box>
        ) : null}

        {children}
      </Box>
    </div>
  );
};
