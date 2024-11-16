import type { ComplexAction } from '@shopify/polaris';
import { Modal } from '@shopify/polaris';
import React, { Component } from 'react';

export class ConfirmDialog extends Component<
  ConfirmDialogProps,
  ConfirmDialogState
> {
  constructor(props: ConfirmDialogProps) {
    super(props);

    this.onClose = this.onClose.bind(this);
    this.onPrimaryAction = this.onPrimaryAction.bind(this);
    this.onSecondaryAction = this.onSecondaryAction.bind(this);
  }

  readonly state = {
    visible: false,
  };

  private resolver: ((value: boolean) => void) | null = null;

  confirm(): Promise<boolean> {
    return new Promise((resolve) => {
      this.setState({ visible: true });

      this.resolver = resolve;
    });
  }

  private onClose() {
    if (this.state.visible) {
      this.setState({ visible: false });
    }

    if (this.resolver) {
      this.resolver(false);
    }

    this.resolver = null;
  }

  private onPrimaryAction() {
    if (this.state.visible) {
      this.setState({ visible: false });
    }

    if (this.resolver) {
      this.resolver(true);
    }

    this.resolver = null;
  }

  private onSecondaryAction() {
    if (this.state.visible) {
      this.setState({ visible: false });
    }

    if (this.resolver) {
      this.resolver(false);
    }

    this.resolver = null;
  }

  render() {
    const { state, props } = this;

    return (
      <Modal
        onClose={this.onClose}
        secondaryActions={[
          {
            ...props.secondaryAction,
            onAction: this.onSecondaryAction,
          },
        ]}
        primaryAction={{
          ...props.primaryAction,
          onAction: this.onPrimaryAction,
        }}
        title={props.title}
        open={state.visible}
      >
        <Modal.Section>
          {
            typeof props.content === 'string' ? (
              <p>{props.content}</p>
            ) : (
              props.content
            )
          }
        </Modal.Section>
      </Modal>
    );
  }
}

export interface ConfirmDialogProps {
  title: string;
  content: React.ReactNode;
  primaryAction: Omit<ComplexAction, 'onAction'>;
  secondaryAction: Omit<ComplexAction, 'onAction'>;
}

export interface ConfirmDialogState {
  visible: boolean;
}
