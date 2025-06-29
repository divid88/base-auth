//types/user type
export interface User{
    email: String,
    id: String,
}


export interface ProfileUser{
    user: User,
    username: String,
    bio: String | null,
    profile_picture: String | null
}

export interface Lesson{
    id: String,
    title: String,
    describe: String,
    code: String,
}

export interface SubSubject{
    id: String,
    title: String,
    description: String,
    lessons: Lesson[],
}

export interface Subject{
    id: String,
    title: String,
    description: String,
    subSubjects: SubSubject[],
}
