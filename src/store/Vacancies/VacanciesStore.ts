export type vacancy = {
    id: string;
    name: string;
    salary: {
        currency: string;
        from: number | null;
        gross: boolean; // Признак что границы зарплаты указаны до вычета налогов
        to: number | null;
    };
    employer: {
        name: string;
        alternate_url: string;
        logo_urls?: {
            '90': string;
        };
    };
    has_test: boolean; // Информация о наличии прикрепленного тестового задании к вакансии
    response_letter_required: boolean; // Обязательно ли заполнять сообщение при отклике на вакансию
    experience: {
        // Требуемый опыт работы из справочника experience
        id: string;
        name: string;
    };
    snippet: {
        // (Дополнительные текстовые отрывки)
        requirement: string | null; // Отрывок из требований по вакансии, если они найдены в тексте описания
        responsibility: string | null; // Отрывок из обязанностей по вакансии, если они найдены в тексте описания
    };

    area: {
        name: string;
    };

    alternate_url: string;
};

export type savedSearch = {
    id: string;
    name: string;
    url: string;
};

export type VacnciesStateT = {
    items: vacancy[];
    loading: boolean;
    page: number;
    pages: number;
    per_page: number;
    alternate_url: string | null;
    errMsg?: string;
    found: number;
    responseIds: Set<string>;
    savedSearch?: savedSearch;
};
