export default function FightersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-ufc-black">
      {children}
    </div>
  );
}