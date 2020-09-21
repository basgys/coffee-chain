interface Props {
  title: string
  subtitle?: string
}

const Header = (props: Props & React.HTMLAttributes<any>) => (
  <div className='header'>
    <div className="header__info">
      {props.subtitle && <h2 className="header__subtitle">{props.subtitle}</h2>}
      <h1 className="header__title">{props.title}</h1>
    </div>

    <div className="header__actions">
      {props.children}
    </div>
  </div>
);

export default Header;