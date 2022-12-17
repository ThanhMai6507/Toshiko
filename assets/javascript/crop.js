$("body").on("change", ".upload_image_data", function (e) {
	var files = e.target.files;
	$(".modal_image").css("display", "block");
	var done = function (url) {
		$(".modal_image_content").html("");
		$(".modal_image_content").html(
			'<img name="modal_image_data" class="modal_image_data" src="' +
				url +
				'" alt="Uploaded Picture">',
		);
	};
	if (files && files.length > 0) {
		var file = files[0];

		if (URL) {
			done(URL.createObjectURL(file));
		} else if (FileReader) {
			reader = new FileReader();
			reader.onload = function (e) {
				done(reader.result);
			};
			reader.readAsDataURL(file);
		}
	}

	var image = document.querySelector(".modal_image_data");
	var modal_image = document.querySelector(".modal_image");
	var button = document.querySelector(".modal_image_upload");
	var result = document.querySelector(".display_image_result");
	var croppable = false;
	var cropper = new Cropper(image, {
		aspectRatio: 1,
		viewMode: 1,
		ready: function () {
			croppable = true;
		},
	});

	button.onclick = function () {
		modal_image.style.display = "none";
		var croppedCanvas;
		var roundedCanvas;
		var roundedImage;

		if (!croppable) {
			return;
		}

		// Crop
		croppedCanvas = cropper.getCroppedCanvas();

		// Round
		roundedCanvas = getRoundedCanvas(croppedCanvas);
		// Show
		roundedImage = document.createElement("img");

		roundedImage.src = roundedCanvas.toDataURL();
		result.innerHTML = "";
		result.appendChild(roundedImage);
		roundedImage.className = "display_image_data";
	};
});

function getRoundedCanvas(sourceCanvas) {
	var canvas = document.createElement("canvas");
	var context = canvas.getContext("2d");
	var width = sourceCanvas.width;
	var height = sourceCanvas.height;

	canvas.width = width;
	canvas.height = height;
	context.imageSmoothingEnabled = true;
	context.drawImage(sourceCanvas, 0, 0, width, height);
	context.globalCompositeOperation = "destination-in";
	context.beginPath();
	context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
	context.fill();
	return canvas;
}

function download() {
	var linkSource = $("#cropped_image_result img").attr("src");
	var fileName = "download.png";
	const downloadLink = document.createElement("a");
	downloadLink.href = linkSource;
	downloadLink.download = fileName;
	downloadLink.click();
}

function upload() {
	var base64data = $("#cropped_image_result img").attr("src");
	//alert(base64data);
	$.ajax({
		type: "POST",
		dataType: "json",
		url: "crop_image_upload.php",
		data: { image: base64data },
		success: function (response) {
			if (response.status == true) {
				alert(response.msg);
			} else {
				alert("Image not uploaded.");
			}
		},
	});
}
