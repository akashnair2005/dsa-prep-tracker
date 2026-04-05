const questions = {
    1: {
        title: "Two Sum",
        difficulty: "Easy",
        tags: ["Array", "Hash Table"],
        complexity: "O(n)",
        solution: `function twoSum(nums, target) {
    let map = new Map();
    for (let i = 0; i < nums.length; i++) {
        let diff = target - nums[i];
        if (map.has(diff)) {
            return [map.get(diff), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`
    },
    2: {
        title: "Add Two Numbers",
        difficulty: "Medium",
        tags: ["Linked List", "Math"],
        complexity: "O(max(m, n))",
        solution: `function addTwoNumbers(l1, l2) {
    let dummy = new ListNode(0);
    let current = dummy;
    let carry = 0;

    while (l1 !== null || l2 !== null || carry > 0) {
        let val1 = l1 ? l1.val : 0;
        let val2 = l2 ? l2.val : 0;
        let sum = val1 + val2 + carry;
        
        carry = Math.floor(sum / 10);
        current.next = new ListNode(sum % 10);
        current = current.next;

        if (l1) l1 = l1.next;
        if (l2) l2 = l2.next;
    }
    return dummy.next;
}`
    },
    3: {
        title: "Longest Substring Without Repeating Characters",
        difficulty: "Medium",
        tags: ["Hash Table", "String", "Sliding Window"],
        complexity: "O(n)",
        solution: `function lengthOfLongestSubstring(s) {
    let set = new Set();
    let left = 0, maxLen = 0;

    for (let right = 0; right < s.length; right++) {
        while (set.has(s[right])) {
            set.delete(s[left]);
            left++;
        }
        set.add(s[right]);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`
    },
    4: {
        title: "Median of Two Sorted Arrays",
        difficulty: "Hard",
        tags: ["Array", "Binary Search", "Divide and Conquer"],
        complexity: "O(log(min(m, n)))",
        solution: `// Find partition such that left halves and right halves are equal.
// Omitted for brevity.`
    },
    5: {
        title: "Valid Parentheses",
        difficulty: "Easy",
        tags: ["String", "Stack"],
        complexity: "O(n)",
        solution: `function isValid(s) {
    let stack = [];
    let map = { ')': '(', '}': '{', ']': '[' };
    for (let char of s) {
        if (map[char]) {
            if (stack.pop() !== map[char]) return false;
        } else {
            stack.push(char);
        }
    }
    return stack.length === 0;
}`
    },
    6: {
        title: "Merge Intervals",
        difficulty: "Medium",
        tags: ["Array", "Sorting"],
        complexity: "O(n log n)",
        solution: `function merge(intervals) {
    if (!intervals.length) return [];
    intervals.sort((a, b) => a[0] - b[0]);
    const res = [intervals[0]];
    for (let i = 1; i < intervals.length; i++) {
        const last = res[res.length - 1];
        if (intervals[i][0] <= last[1]) {
            last[1] = Math.max(last[1], intervals[i][1]);
        } else {
            res.push(intervals[i]);
        }
    }
    return res;
}`
    },
    7: {
        title: "Maximum Subarray",
        difficulty: "Medium",
        tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
        complexity: "O(n)",
        solution: `function maxSubArray(nums) {
    let maxSum = nums[0];
    let currentSum = nums[0];
    for (let i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
}`
    },
    8: {
        title: "Climbing Stairs",
        difficulty: "Easy",
        tags: ["Math", "Dynamic Programming", "Memoization"],
        complexity: "O(n)",
        solution: `function climbStairs(n) {
    if (n <= 2) return n;
    let a = 1, b = 2;
    for (let i = 3; i <= n; i++) {
        let temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}`
    },
    9: {
        title: "Binary Tree Level Order Traversal",
        difficulty: "Medium",
        tags: ["Tree", "Breadth-First Search", "Binary Tree"],
        complexity: "O(n)",
        solution: `function levelOrder(root) {
    if (!root) return [];
    let res = [];
    let queue = [root];
    while (queue.length > 0) {
        let levelSize = queue.length;
        let currentLevel = [];
        for (let i = 0; i < levelSize; i++) {
            let node = queue.shift();
            currentLevel.push(node.val);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        res.push(currentLevel);
    }
    return res;
}`
    },
    10: {
        title: "Merge k Sorted Lists",
        difficulty: "Hard",
        tags: ["Linked List", "Divide and Conquer", "Heap (Priority Queue)"],
        complexity: "O(n log k)",
        solution: `// Requires a Priority Queue implementation in JS or divide and conquer approach
// Divide and conquer merging
function mergeKLists(lists) {
    if (lists.length === 0) return null;
    while (lists.length > 1) {
        let a = lists.shift();
        let b = lists.shift();
        let merged = mergeTwoLists(a, b);
        lists.push(merged);
    }
    return lists[0];
}
// Using mergeTwoLists from Leetcode #21`
    }
};

module.exports = questions;