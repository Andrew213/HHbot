export type userT = {
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    email?: string;
    resumes_url?: string;
    counter?: {
        new_resume_views: number;
        unread_negotiations: number;
        resumes_count: number;
    };
};

export type userStateT = {
    user: userT;
    loading: boolean;
    errMsg: string;
};
