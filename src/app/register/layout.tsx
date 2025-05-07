import "../globals.css"

export const metadata = {
  title: "Регистрация - DataFlow",
  description: 'DataFlow страница регистрации',
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={"w-full"}>
      {children}
    </div>
  )
}
