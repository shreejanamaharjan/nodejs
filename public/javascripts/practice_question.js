// Write a function to reverse a given string without using the built-in `reverse()` method.
var userInput = document.getElementById("user-form");
function reverse(input) {
  let reverseString = "";
  for (let i = input.length - 1; i >= 0; i--) {
    reverseString += input[i];
  }
  return reverseString;
}

userInput.addEventListener("submit", function (event) {
  // prevent default form action
  event.preventDefault();

  var input = userInput.input.value;
  var result = reverse(input);
  var label = document.createElement("label");
  label.textContent = result;
  this.append(label);
  console.log(result);
  userInput.reset();
});

// Write a function to calculate the factorial of a given positive integer.
var userInput1 = document.getElementById("user-form1");
function factorial(input1) {
  if (input1 >= 0) {
    let factorial = 1;
    for (var i = input1; i >= 1; i--) {
      factorial = factorial * i;
    }
    return factorial;
  } else {
    console.log("invalid number");
    return "invalid number";
  }
}

userInput1.addEventListener("submit", function (event) {
  // prevent default form action
  event.preventDefault();

  var input = userInput1.input1.value;
  var result = factorial(input);
  var label = document.createElement("label");
  label.textContent = result;
  this.append(label);
  console.log(result);
  userInput1.reset();
});

// Create a function that checks if a given string is a palindrome (reads the same backward as forward).
var userInput2 = document.getElementById("user-form2");
function palindrome(input2) {
  let string = input2;
  let reverseString = "";
  for (let i = input2.length - 1; i >= 0; i--) {
    reverseString += input2[i];
  }
  if (reverseString == string) {
    return "palindrome";
  } else {
    return "not palindrome";
  }
}

userInput2.addEventListener("submit", function (event) {
  // prevent default form action
  event.preventDefault();

  var input = userInput2.input2.value;
  var result = palindrome(input);
  var label = document.createElement("label");
  label.textContent = result;
  this.append(label);
  console.log(result);
  this.reset();
});

// Write a function that finds and returns the longest word in a sentence.
var userInput3 = document.getElementById("user-form3");
function Longest_Word(input) {
  // Split the sentence into an array of words
  let words = input.split(/\s+/);

  // Initialize variables to store the longest word and its length
  let longestWord = "";
  let maxLength = 0;

  // Iterate through each word in the array
  for (let i = 0; i < words.length; i++) {
    // Remove any non-alphabetic characters from the word
    let cleanedWord = words[i].replace(/[^a-zA-Z]/g, "");

    // Check if the current word is longer than the previous longest word
    if (cleanedWord.length > maxLength) {
      maxLength = cleanedWord.length;
      longestWord = cleanedWord;
    }
  }

  return longestWord;
}

userInput3.addEventListener("submit", function (event) {
  // prevent default form action
  event.preventDefault();

  var input = userInput3.input.value;
  var result = Longest_Word(input);
  var label = document.createElement("label");
  label.textContent = result;
  this.append(label);
  console.log(result);
  this.reset();
});

// Write a program that prints numbers from 1 to 100. For multiples of 3, print "Fizz"; for multiples of 5,
// print "Buzz"; and for multiples of both 3 and 5, print "FizzBuzz".
var userInput4 = document.getElementById("user-form4");
function FizzBuzz(input4) {
  if (input4 >= 1 && input4 <= 100) {
    if (input4 % 3 == 0 && input4 % 5 == 0) {
      return "fizzbuzz";
    } else if (input4 % 3 == 0) {
      return "fizz";
    } else if (input4 % 5 == 0) {
      return "buzz";
    } else {
      return input4;
    }
  } else {
    return "invalid";
  }
}

userInput4.addEventListener("submit", function (event) {
  // prevent default form action
  event.preventDefault();

  var number = Math.floor(Math.random() * 100) + 1;
  console.log(number);
  var result = FizzBuzz(number);
  var label = document.createElement("label");
  label.textContent = result;
  this.append(label);
  console.log(result);
  this.reset();
});

// Write a function that calculates the sum of all elements in an array
var userInput5 = document.getElementById("user-form5");
function arraySum(input5) {
  // Split the sentence into an array of words
  let words = input5.split(/\s+/).map(Number);
  var sum = 0;
  for (var i = 0; i < words.length; i++) {
    sum += words[i];
  }
  return sum;
}

userInput5.addEventListener("submit", function (event) {
  // prevent default form action
  event.preventDefault();

  var input = userInput5.input.value;
  var result = arraySum(input);
  var label = document.createElement("label");
  label.textContent = result;
  this.append(label);
  console.log(result);
  this.reset();
});

// Create a function that converts a sentence to title case (capitalize the first letter of each word)
var userInput6 = document.getElementById("user-form6");
function titileCase(input6) {
  // Split the sentence into an array of words
  let words = input6.split(/\s+/);

  // Capitalize the first letter of each word
  for (let i = 0; i < words.length; i++) {
    words[i] =
      words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
  }

  // Join the words back into a sentence
  let titleCaseSentence = words.join(" ");

  return titleCaseSentence;
}

userInput6.addEventListener("submit", function (event) {
  // prevent default form action
  event.preventDefault();

  var input = userInput6.input.value;
  var result = titileCase(input);
  var label = document.createElement("label");
  label.textContent = result;
  this.append(label);
  console.log(result);
  this.reset();
});

// Write a function that counts the number of vowels in a given string
var userInput7 = document.getElementById("user-form7");
function vowels(input7) {
  // Convert the string to lowercase to make the counting case-insensitive
  input7 = input7.toLowerCase();

  // Define an array of vowels
  const vowels = ["a", "e", "i", "o", "u"];

  // Initialize a counter for the number of vowels
  let count = 0;

  // Iterate through each character in the string
  for (let char of input7) {
    // Check if the character is a vowel
    if (vowels.includes(char)) {
      count++;
    }
  }

  return count;
}

userInput7.addEventListener("submit", function (event) {
  // prevent default form action
  event.preventDefault();

  var input = userInput7.input.value;
  var result = vowels(input);
  var label = document.createElement("label");
  label.textContent = result;
  this.append(label);
  console.log(result);
  this.reset();
});

// Implement a function that generates the Fibonacci sequence up to a specified number of terms.
var userInput8 = document.getElementById("user-form8");
function Fibonacci(input8) {
  let fibonacciSequence = [0, 1];

  // Ensure that n is at least 2
  n = Math.max(input8, 2);

  // Generate Fibonacci sequence up to n terms
  for (let i = 2; i < input8; i++) {
    let nextTerm = fibonacciSequence[i - 1] + fibonacciSequence[i - 2];
    fibonacciSequence.push(nextTerm);
  }
  let result = fibonacciSequence.join(" ");
  return result;
}

userInput8.addEventListener("submit", function (event) {
  // prevent default form action
  event.preventDefault();

  var input = parseInt(userInput8.input.value);
  var result = Fibonacci(input);
  var label = document.createElement("label");
  label.textContent = result;
  this.append(label);
  console.log(result);
  this.reset();
});

// Write a function that checks if two strings are anagrams of each other (contain the same letters,
// ignoring spaces and capitalization).
var userInput9 = document.getElementById("user-form9");
function Anagrams(input9, input10) {
  // Convert the strings to arrays of characters, sort them, and join back into strings
  var sortedStr1 = input9.split("").sort().join("");
  var sortedStr2 = input10.split("").sort().join("");

  // Check if the sorted strings are equal
  if (sortedStr1 === sortedStr2) {
    return "anagrams";
  } else {
    return "not anagrams";
  }
}

userInput9.addEventListener("submit", function (event) {
  // prevent default form action
  event.preventDefault();

  var input1 = userInput9.input1.value;
  var input2 = userInput9.input2.value;
  var result = Anagrams(input1, input2);
  var label = document.createElement("label");
  label.textContent = result;
  this.append(label);
  console.log(result);
  this.reset();
});

// Given an array containing n distinct numbers taken from 0 to n, find the missing number
var userInput10 = document.getElementById("user-form10");
function Missing(nums) {
  let number = nums.split(/\s+/).map(Number);
  const n = number.length;
  // Calculate the sum of expected values from 0 to n
  const expectedSum = (n * (n + 1)) / 2;

  // Calculate the sum of the actual array
  const actualSum = nums.reduce((sum, num) => sum + num, 0);

  // The missing number is the difference between the expected and actual sums
  return expectedSum - actualSum;
}

userInput10.addEventListener("submit", function (event) {
  // prevent default form action
  event.preventDefault();

  var input = userInput10.input1.value;
  var result = Missing(input);
  var label = document.createElement("label");
  label.textContent = result;
  this.append(label);
  console.log(result);
  this.reset();
});

// Write a function that removes duplicate elements from an array.
var userInput9 = document.getElementById("user-form9");
function Anagrams(input9, input10) {
  // Convert the strings to arrays of characters, sort them, and join back into strings
  var sortedStr1 = input9.split("").sort().join("");
  var sortedStr2 = input10.split("").sort().join("");

  // Check if the sorted strings are equal
  if (sortedStr1 === sortedStr2) {
    return "anagrams";
  } else {
    return "not anagrams";
  }
}

userInput9.addEventListener("submit", function (event) {
  // prevent default form action
  event.preventDefault();

  var input1 = userInput9.input1.value;
  var input2 = userInput9.input2.value;
  var result = Anagrams(input1, input2);
  var label = document.createElement("label");
  label.textContent = result;
  this.append(label);
  console.log(result);
  this.reset();
});

// Given an array containing n distinct numbers taken from 0 to n, find the missing number
var userInput11 = document.getElementById("user-form11");
function duplicate(nums) {
  let number = nums.split(/\s+/).map(Number);

  // Use a Set to store unique elements
  let uniqueElements = new Set();

  // Create a new array with unique elements
  let result = [];
  for (let element of number) {
    if (!uniqueElements.has(element)) {
      result.push(element);
      uniqueElements.add(element);
    }
  }

  return result;
}

userInput11.addEventListener("submit", function (event) {
  // prevent default form action
  event.preventDefault();

  var input = userInput11.input1.value;
  var result = duplicate(input);
  var label = document.createElement("label");
  label.textContent = result;
  this.append(label);
  console.log(result);
  this.reset();
});

// Implement a function that calculates x^n (x raised to the power of n) without using the `Math.pow()`
// method.
var userInput12 = document.getElementById("user-form12");
function power(x, n) {
  if (n === 0) {
    return 1;
  }

  let result = 1;
  let isNegative = n < 0;
  n = Math.abs(n);

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return isNegative ? 1 / result : result;
}

userInput12.addEventListener("submit", function (event) {
  // prevent default form action
  event.preventDefault();

  var input1 = userInput12.input1.value;
  var input2 = userInput12.input2.value;
  var result = power(input1, input2);
  var label = document.createElement("label");
  label.textContent = result;
  this.append(label);
  console.log(result);
  this.reset();
});

// Write a function that merges two sorted arrays into a single sorted array.
var userInput13 = document.getElementById("user-form13");
function merge(input1, input2) {
  let arr1 = input1.split(/\s+/).map(Number);
  let arr2 = input2.split(/\s+/).map(Number);
  let result = [];
  let i = 0;
  let j = 0;

  // Merge elements until one of the arrays is exhausted
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }

  // If there are remaining elements in arr1, add them to the result
  while (i < arr1.length) {
    result.push(arr1[i]);
    i++;
  }

  // If there are remaining elements in arr2, add them to the result
  while (j < arr2.length) {
    result.push(arr2[j]);
    j++;
  }

  return result;
}

userInput13.addEventListener("submit", function (event) {
  // prevent default form action
  event.preventDefault();

  var input1 = userInput13.input1.value;
  var input2 = userInput13.input2.value;
  var result = merge(input1, input2);
  var label = document.createElement("label");
  label.textContent = result;
  this.append(label);
  console.log(result);
  this.reset();
});

// Create a function that finds and returns the second-largest number in an array of numbers.
var userInput14 = document.getElementById("user-form14");
function second_largest(input1) {
  let arr = input1.split(/\s+/).map(Number);

  let largest = -Infinity;
  let secondLargest = -Infinity;

  for (let number of arr) {
    if (number > largest) {
      // Update both largest and secondLargest
      secondLargest = largest;
      largest = number;
    } else if (number > secondLargest && number !== largest) {
      // Update only secondLargest
      secondLargest = number;
    }
  }

  if (secondLargest === -Infinity) {
    // Handle the case where all elements in the array are the same
    return "All elements in the array are the same";
  }

  return secondLargest;
}

userInput14.addEventListener("submit", function (event) {
  // prevent default form action
  event.preventDefault();

  var input1 = userInput14.input1.value;
  var result = second_largest(input1);
  var label = document.createElement("label");
  label.textContent = result;
  this.append(label);
  console.log(result);
  this.reset();
});

// Write a function that reverses the order of words in a sentence.
var userInput15 = document.getElementById("user-form15");
function reverseWord(input1) {
  // Split the sentence into an array of words
  let wordsArray = input1.split(/\s+/);

  // Reverse the array of words
  let reversedArray = wordsArray.reverse();

  // Join the reversed array back into a sentence
  let reversedSentence = reversedArray.join(" ");

  return reversedSentence;
}

userInput15.addEventListener("submit", function (event) {
  // prevent default form action
  event.preventDefault();

  var input1 = userInput15.input1.value;
  var result = reverseWord(input1);
  var label = document.createElement("label");
  label.textContent = result;
  this.append(label);
  console.log(result);
  this.reset();
});

// Implement a function that validates if a given string is a valid email address.
var userInput16 = document.getElementById("user-form16");
function isValid(email) {
  // Regular expression for a basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Test the email against the regular expression
  return emailRegex.test(email);
}

userInput16.addEventListener("submit", function (event) {
  // prevent default form action
  event.preventDefault();

  var input1 = userInput16.input1.value;
  var result = isValid(input1);
  var label = document.createElement("label");
  label.textContent = result;
  this.append(label);
  console.log(result);
  this.reset();
});

// Write a function that finds the intersection (common elements) of two arrays.
var userInput17 = document.getElementById("user-form17");
function merge(input1, input2) {
  let arr1 = input1.split(/\s+/).map(Number);
  let arr2 = input2.split(/\s+/).map(Number);
  // Use a Set to store unique elements from the first array
  let set = new Set(arr1);

  // Use filter to keep only the elements present in both arrays
  let intersection = arr2.filter((element) => set.has(element));

  return intersection;
}

userInput17.addEventListener("submit", function (event) {
  // prevent default form action
  event.preventDefault();

  var input1 = userInput17.input1.value;
  var input2 = userInput17.input2.value;
  var result = merge(input1, input2);
  var label = document.createElement("label");
  label.textContent = result;
  this.append(label);
  console.log(result);
  this.reset();
});

// Implement a function that checks if a string with brackets (e.g., "{[()]}" or "[(){}]") is balanced.
var userInput18 = document.getElementById("user-form18");
function isBalanced(str) {
    const stack = [];
    const brackets = {
        '{': '}',
        '[': ']',
        '(': ')'
    };

    for (let char of str) {
        if (brackets[char]) {
            // If the character is an opening bracket, push it onto the stack
            stack.push(char);
        } else {
            // If the character is a closing bracket
            const lastBracket = stack.pop();

            // Check if the corresponding opening bracket matches
            if (brackets[lastBracket] !== char) {
                return false;
            }
        }
    }

    // The string is balanced if the stack is empty
    return stack.length === 0;
}

userInput18.addEventListener("submit", function (event) {
  // prevent default form action
  event.preventDefault();

  var input1 = userInput18.input1.value;
  var result = isBalanced(input1);
  var label = document.createElement("label");
  label.textContent = result;
  this.append(label);
  console.log(result);
  this.reset();
});
