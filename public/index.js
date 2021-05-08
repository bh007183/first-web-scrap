// localStorage.setItem("numJobs", 0);

// setInterval( function () {
	// $.getJSON(
	// 	"http://www.whateverorigin.org/get?url=" +
	// 	  encodeURIComponent("https://www.trilogyed.com/about/careers/") +
	// 	  "&callback=?",
	// 	function (res) {
	// 	  $("#body").append(res.contents);
	// 	  let counter = 0;
	// 	  $.each($(".job-title"), function () {
	// 		let string = $(this).text();
	// 		if (string.includes("Teaching Assistant")) {
	// 		  counter++;
	// 		  console.log($(this).text());
	// 		}
	// 	  });
	// 	  if (counter > localStorage.getItem("numJobs")) {
	// 		$.ajax("/sendMessage", {
	// 		  method: "POST",
	// 		  data: {
	// 			former: localStorage.getItem("numJobs"),
	// 			new: counter,
	// 		  },
	// 		}).then((res) => {
	// 		  localStorage.setItem("numJobs", counter);
	// 		});
	// 	  } else {
	// 		localStorage.setItem("numJobs", counter);
	// 	  }
	// 	}
	//   );
	  
	
// }, 1000 * 60 * 60 * 24)

