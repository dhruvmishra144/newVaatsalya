import type { Metadata } from 'next';
import '../index.css';
import ClientLayout from '../components/ClientLayout';

export const metadata: Metadata = {
  title: 'Vaatsalya Foods',
  description: 'Vaatsalya Indian Spice Journey',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
