async function leetcodeGraphQL(query, variables) {
    try {
        // Native fetch is available in Node 18+
        const response = await fetch('https://leetcode.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': 'https://leetcode.com/'
            },
            body: JSON.stringify({ query, variables })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (err) {
        console.error("LeetCode Request Failed: ", err.message);
        throw err;
    }
}

async function getUserStats(username) {
    const query = `
    query getUserProfile($username: String!) {
        matchedUser(username: $username) {
            submitStats: submitStatsGlobal {
                acSubmissionNum {
                    difficulty
                    count
                }
            }
        }
    }`;
    const res = await leetcodeGraphQL(query, { username });
    if (!res.data || !res.data.matchedUser) return null;
    return res.data.matchedUser.submitStats.acSubmissionNum;
}

async function getProblemList(limit = 100, skip = 0) {
    const query = `
    query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
        problemsetQuestionList: questionList(categorySlug: $categorySlug, limit: $limit, skip: $skip, filters: $filters) {
            totalNum
            data {
                acRate
                difficulty
                frontendQuestionId: questionFrontendId
                title
                titleSlug
                topicTags {
                    name
                }
            }
        }
    }`;
    const res = await leetcodeGraphQL(query, { categorySlug: "", skip, limit, filters: {} });
    return res.data ? res.data.problemsetQuestionList.data : [];
}

async function getProblemDetails(titleSlug) {
    const query = `
    query questionData($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
            questionId
            title
            content
            difficulty
            topicTags {
                name
            }
            hints
        }
    }`;
    const res = await leetcodeGraphQL(query, { titleSlug });
    return res.data ? res.data.question : null;
}

module.exports = {
    getUserStats,
    getProblemList,
    getProblemDetails
};
