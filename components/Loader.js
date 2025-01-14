/**
 * Loader Component
 * 
 * Displays a loading spinner when the `show` prop is true.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.show - Determines whether to show the loader
 */
export default function Loader({ show }) {
  return show ? <div className="loader"></div> : null;
}