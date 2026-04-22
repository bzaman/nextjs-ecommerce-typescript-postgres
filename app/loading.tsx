import Spinner from "@/components/ui/spinner";

export default function loading() {
  return (
    <div className="min-h-svh w-full flex items-center justify-center">
      <Spinner />
    </div>
  )
}
