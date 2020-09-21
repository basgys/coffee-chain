import Spinner from "components/spinner";

interface Props {
  loading: boolean
  children: React.ReactNode
}

export const Loader = (props: Props) => (
  props.loading ? <Spinner /> : <>{props.children}</>
);

export default Loader;