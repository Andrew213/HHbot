export type UserStateT = {
    jwt: string;
    ip?: string;
};

const UserState: UserStateT = { jwt: '' };

export const UserReducer = (state: UserStateT = UserState): UserStateT => {
    return state;
};
