export type ConfimModalProps = {
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
  open: boolean;
  danger?: boolean;
};
