import { Avatar } from "antd"

const AvatarPlusName = ({ avatar, name }: { avatar: string, name: string }) => {
    return <Avatar.Group className="avatar-plus-name" style={AvatarPlusNameStyle}>

        <a href="#">
            <Avatar size="small" src={avatar} />
        </a>
        {name}
    </Avatar.Group>
}

const AvatarPlusNameStyle: React.CSSProperties = {
    borderRadius: "16px",
    border: "1px solid #EBECF2",
    padding: "4px 8px 4px 4px",
    marginRight: ".5rem"

}

export default AvatarPlusName;