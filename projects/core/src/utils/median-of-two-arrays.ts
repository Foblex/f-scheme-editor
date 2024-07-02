export function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }

  let len1 = nums1.length;
  let len2 = nums2.length;

  console.log('length of nums1:', len1);
  console.log('length of nums2:', len2);

  let low = 0, high = len1;

  while (low <= high) {
    console.log('low:', low);
    console.log('high:', high);
    let partition1 = Math.floor((low + high) / 2);
    let partition2 = Math.floor((len1 + len2 + 1) / 2) - partition1;
    console.log('partition1:', partition1);
    console.log('partition2:', partition2);

    let maxLeft1 = (partition1 == 0) ? Number.MIN_SAFE_INTEGER : nums1[partition1 - 1];
    console.log('maxLeft1:', maxLeft1);
    let minRight1 = (partition1 == len1) ? Number.MAX_SAFE_INTEGER : nums1[partition1];
    console.log('minRight1:', minRight1);

    let maxLeft2 = (partition2 == 0) ? Number.MIN_SAFE_INTEGER : nums2[partition2 - 1];
    console.log('maxLeft2:', maxLeft2);
    let minRight2 = (partition2 == len2) ? Number.MAX_SAFE_INTEGER : nums2[partition2];
    console.log('minRight2:', minRight2);

    if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
      if ((len1 + len2) % 2 == 0) {
        return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
      } else {
        return Math.max(maxLeft1, maxLeft2);
      }
    } else if (maxLeft1 > minRight2) {
      high = partition1 - 1;
    } else {
      low = partition1 + 1;
    }
  }

  throw new Error("Input arrays are not sorted");
}
