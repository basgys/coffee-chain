import { useRouter } from 'next/router'

export namespace qs {
  // String returns a query string parameter of type string
  export const String = (name: string) => {
    const router = useRouter()
    const v = router.query[name]

    if (typeof v === 'string') return v
    return v && v.length > 0  ? v[0] : ""
  }
}

export default qs