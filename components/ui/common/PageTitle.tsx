export default function PageTitle({ title }: { title: string }) {
    return (
        <h1 className="text-4xl font-bold text-gray-100 tracking-tight m-1">{title}</h1>
    )
}