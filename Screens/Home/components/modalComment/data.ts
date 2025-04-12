export const dataComment = [
    {
        userId: "u1",
        username: "john_doe",
        firstname: "John",
        lastname: "Doe",
        timecreate: "2025-04-12T08:30:00Z",
        content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.!",
        avatar: "https://i.pravatar.cc/150?img=1",
        isCurrentUser: false,
        childComment: [
            {
                userId: "u2",
                username: "jane_smith",
                firstname: "Jane",
                lastname: "Smith",
                timecreate: "2025-04-12T08:35:00Z",
                content: "Totally agree with you!",
                avatar: "https://i.pravatar.cc/150?img=2",
                isCurrentUser: false
            }
        ]
    },
    {
        userId: "u3",
        username: "mike_ross",
        firstname: "Mike",
        lastname: "Ross",
        timecreate: "2025-04-12T09:00:00Z",
        content: "This feature is almost ready for QA.",
        avatar: "https://i.pravatar.cc/150?img=3",
        isCurrentUser: false,
        childComment: []
    },
    {
        userId: "u4",
        username: "sarah.connor",
        firstname: "Sarah",
        lastname: "Connor",
        timecreate: "2025-04-12T09:15:00Z",
        content: "Awesome! Just tested and it works fine.",
        avatar: "https://i.pravatar.cc/150?img=4",
        isCurrentUser: true,
        childComment: [
            {
                userId: "u5",
                username: "tony_stark",
                firstname: "Tony",
                lastname: "Stark",
                timecreate: "2025-04-12T09:20:00Z",
                content: "Thanks for confirming!",
                avatar: "https://i.pravatar.cc/150?img=5",
                isCurrentUser: false
            },
            {
                userId: "u6",
                username: "bruce_wayne",
                firstname: "Bruce",
                lastname: "Wayne",
                timecreate: "2025-04-12T09:25:00Z",
                content: "Great job, team.",
                avatar: "https://i.pravatar.cc/150?img=6",
                isCurrentUser: false
            }
        ]
    },
    {
        userId: "u7",
        username: "natasha_romanoff",
        firstname: "Natasha",
        lastname: "Romanoff",
        timecreate: "2025-04-12T10:00:00Z",
        content: "Merged the pull request successfully.",
        avatar: "https://i.pravatar.cc/150?img=7",
        isCurrentUser: true,
        childComment: []
    },
    {
        userId: "u8",
        username: "clark.kent",
        firstname: "Clark",
        lastname: "Kent",
        timecreate: "2025-04-12T10:15:00Z",
        content: "Waiting for design team's feedback.",
        avatar: "https://i.pravatar.cc/150?img=8",
        isCurrentUser: false,
        childComment: [
            {
                userId: "u10",
                username: "wanda.maximoff",
                firstname: "Wanda",
                lastname: "Maximoff",
                timecreate: "2025-04-12T10:20:00Z",
                content: "Design is final now. Go ahead!",
                avatar: "https://i.pravatar.cc/150?img=10",
                isCurrentUser: true
            }
        ]
    },
    {
        userId: "u9",
        username: "peter_parker",
        firstname: "Peter",
        lastname: "Parker",
        timecreate: "2025-04-12T10:30:00Z",
        content: "Found a minor bug in the login flow.",
        avatar: "https://i.pravatar.cc/150?img=9",
        isCurrentUser: false,
        childComment: []
    }
];
