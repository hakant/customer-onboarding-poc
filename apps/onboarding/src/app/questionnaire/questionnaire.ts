export type QuestionModel = {
    id: string;
    text: string;
    options: { text: string, code: string }[]
}

const questionnaire: QuestionModel[] = [
    {
        "id": "1",
        "text": "For whom are you investing?",
        "options": [
            {
                "text": "For myself",
                "code": "one-person"
            },
            {
                "text": "For myself and my partner",
                "code": "two-person"
            }
        ]
    },
    {
        "id": "2",
        "text": "What is the size of your household?",
        "options": [
            {
                "text": "Only myself",
                "code": "1-person"
            },
            {
                "text": "2 or 3",
                "code": "2-3-person"
            },
            {
                "text": "More than 3",
                "code": "more-than-3-person"
            }
        ]
    },
    {
        "id": "3",
        "text": "What is your total yearly gross income?",
        "options": [
            {
                "text": "Higher than € 150.000",
                "code": "higher-than-150K"
            },
            {
                "text": "€ 100.000 to € 150.000",
                "code": "100K-to-150K"
            },
            {
                "text": "€ 60.000 to € 100.000",
                "code": "60K-to-100K"
            },
            {
                "text": "€ 20.000 to € 60.000",
                "code": "20K-to-60K"
            },
            {
                "text": "Lower than € 20.000",
                "code": "lower-than-20K"
            }
        ]
    }
];

export default questionnaire;