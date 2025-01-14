/**
 * UserProfile Component
 * 
 * Displays a user's profile information, including their avatar, username, and display name.
 * 
 * @param {Object} props - Component props
 * @param {Object} props.user - User object containing photoURL, username, and displayName
 */
export default function UserProfile({ user }) {
    return (
        <div className="box-center">
            <img src={user.photoURL} className="card-img-center" />
            <p>
                <i>@{user.username}</i>
            </p>
            <h1>{user.displayName}</h1>
        </div>
    );
}