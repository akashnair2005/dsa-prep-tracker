const questions = {
    1: {
        title: "Two Sum",
        difficulty: "Easy",
        tags: ["Array", "HashMap"],
        complexity: "O(n)",
        solution: `
function twoSum(nums, target) {
    let map = {};
    for (let i = 0; i < nums.length; i++) {
        let diff = target - nums[i];
        if (map[diff] !== undefined) {
            return [map[diff], i];
        }
        map[nums[i]] = i;
    }
}
`
    },
    2: {
        title: "Add Two Numbers",
        difficulty: "Medium",
        tags: ["Linked List"],
        complexity: "O(n)",
        solution: `
function addTwoNumbers(l1, l2) {
    let dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;

    while (l1 || l2 || carry) {
        let sum = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;
        carry = Math.floor(sum / 10);

        current.next = new ListNode(sum % 10);
        current = current.next;

        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }

    return dummy.next;
}
`
    },
    3: {
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        tags: ["Sliding Window"],
        complexity: "O(n)",
        solution: `
function lengthOfLongestSubstring(s) {
    let set = new Set();
    let left = 0;
    let max = 0;

    for (let right = 0; right < s.length; right++) {
        while (set.has(s[right])) {
            set.delete(s[left]);
            left++;
        }
        set.add(s[right]);
        max = Math.max(max, right - left + 1);
    }

    return max;
}
`
    }
};

module.exports = questions;