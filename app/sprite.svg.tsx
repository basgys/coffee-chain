const Sprite = (
  props: React.HTMLAttributes<any> & React.SVGAttributes<any>
) => (
  <svg className="hidden displayNone">
    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="warning">
      <circle cx="12" cy="16.875" r="1.125"/>
      <path d="M12 14.25a.75.75 0 01-.75-.75V5.25a.75.75 0 011.5 0v8.25a.75.75 0 01-.75.75z"/>
      <path d="M12 24C5.383 24 0 18.617 0 12S5.383 0 12 0s12 5.383 12 12-5.383 12-12 12zm0-22.5C6.21 1.5 1.5 6.21 1.5 12S6.21 22.5 12 22.5 22.5 17.79 22.5 12 17.79 1.5 12 1.5z"/>
    </symbol>
    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" id="success">
      <circle cx="25" cy="25" r="25"></circle>
      <path
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit="10"
        d="M38 15L22 33l-10-8"
      ></path>
    </symbol>
    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" id="error">
      <circle cx="25" cy="25" r="25"></circle>
      <path
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeMiterlimit="10"
        d="M16 34l9-9 9-9m-18 0l9 9 9 9"
      ></path>
    </symbol>
    <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="transfer">
      <path d="M6.481,5.124a1.5,1.5,0,0,0-1.5,1.5V16.733a.249.249,0,0,1-.25.25H3.481A1,1,0,0,0,2.624,18.5l3,5a1,1,0,0,0,1.715,0l3-5a1,1,0,0,0-.858-1.514H8.231a.25.25,0,0,1-.25-.25V6.624A1.5,1.5,0,0,0,6.481,5.124Z"/><path d="M17.519,18.84a1.5,1.5,0,0,0,1.5-1.5V7.233a.249.249,0,0,1,.25-.25h1.25a1,1,0,0,0,.857-1.515l-3-5a1.04,1.04,0,0,0-1.715,0l-3,5a1,1,0,0,0,.858,1.515h1.25a.25.25,0,0,1,.25.25V17.34A1.5,1.5,0,0,0,17.519,18.84Z"/>
    </symbol>
  </svg>
);

export default Sprite;