import { useAppSelector } from "@/appStore/hooks"
import EditProfile from "@/components/ui/EditProfile"

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div>
      <EditProfile data={user} />
    </div>
  )
}

export default Profile