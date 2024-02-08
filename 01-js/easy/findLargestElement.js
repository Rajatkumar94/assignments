/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
  let largestElement = 0;

  for (let element of numbers) {
    if (largestElement < element) {
      largestElement = element;
    }
  }

  return largestElement;
}

// console.log(findLargestElement([2,2,2,2,3,3,3,4,4]))

export default findLargestElement;
