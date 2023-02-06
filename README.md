# Lab Class 17 - AWS: S3 and Lambda
## Documentation
### Description of Lambda Use
- I used Lambda to create a function called imageSummarizer. This function is triggered by an event when an image file is added to our connected S3 bucket. 
- The function then access the images from our bucket and returns a summary. 

### Issues Encountered During Deployment
- While following along with lecture, our instructor came across issues with writting out the policies for both S3 and Lambda. He had to figure out how to write the policies correctly to allow Lambda to put images into our S3 buckets and for our S3 images to be viewed publically. David did figure this out in the end, but I definitely will need to read documentation or review lecture if I wanted to go through that again. 
- My code is still getting one error that David didn't get to touch back on in lecture: <br>
`{` <br>
  `"errorType": "SyntaxError",` <bR>
  `"errorMessage": "Unexpected token o in JSON at position 1",` <br>
  `"trace": [` <br>
    `"SyntaxError: Unexpected token o in JSON at position 1",` <br>
    `"    at JSON.parse (<anonymous>)",` <br>
    `"    at Runtime.handler (file:///var/task/index.mjs:26:26)",` <br>
    `"    at process.processTicksAndRejections (node:internal/``process/task_queues:95:5)"` <br>
  `]` <br>
`}`

### Link to images.json File
[maru.png](https://syu-images.s3.us-west-2.amazonaws.com/summary.json)