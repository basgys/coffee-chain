import classNames from 'classnames'

interface Props {
  children: React.ReactNode
}

export const PropertyList = (props: Props & React.HTMLAttributes<any>) => (
  <div className={classNames("propery-list", props.className)}>
    {props.children}
  </div>
);

export const PropertyListTitle = (props: React.HTMLAttributes<any>) => (
  <h2 className={classNames("propery-list__title", props.className)}>
    {props.children}
  </h2>
);

export default PropertyList;

interface ItemProps {
  label: string
  children?: React.ReactNode
}

export const PropertListItem = (props: ItemProps & React.HTMLAttributes<any>) => (
  <div className="propery-list__item grid grid--stretch">
    <div className="propery-list__item__label grid__cell grid__cell--1/3 grid__cell--1/1@phone">
      {props.label}
    </div>
    <div className="propery-list__item__value grid__cell grid__cell--2/3 grid__cell--1/1@phone">
      {props.children}
    </div>
  </div>
)

