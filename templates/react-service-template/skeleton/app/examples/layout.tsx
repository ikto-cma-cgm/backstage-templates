import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Examples - Best Practices',
  description: 'React best practices and component examples',
};

export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}