export type BasicModalProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "small" | "medium" | "large";
};
