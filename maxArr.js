function maxSubArray(nums) {
  let maxSoFar = nums[0];
  let currentMax = nums[0];
  let start = 0,
    end = 0,
    tempStart = 0;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > currentMax + nums[i]) {
      currentMax = nums[i];
      tempStart = i;
    } else {
      currentMax += nums[i];
    }

    if (currentMax > maxSoFar) {
      maxSoFar = currentMax;
      start = tempStart;
      end = i;
    }
  }

  const maxSubarray = nums.slice(start, end + 1);
  return {maxSum: maxSoFar, subarray: maxSubarray};
}

// Example usage:
const nums = [-2, 1, -3, 4, 5, -1, 2, 1, -5, 4];
const result = maxSubArray(nums);
console.log('Maximum Subarray Sum:', result.maxSum);
console.log('Subarray:', result.subarray);
