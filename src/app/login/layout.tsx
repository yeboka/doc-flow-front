import "../globals.css"

export const metadata = {
  title: "Вход - DataFlow",
  description: 'DataFlow страница входа',
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
