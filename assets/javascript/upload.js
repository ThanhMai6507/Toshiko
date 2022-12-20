var fileInput = document.querySelector("input[type=file]");
var uploadFile = document.querySelector(".upload");
function previewFile() {
	var preview = document.querySelector(".upload_result");
	var file = fileInput.files[0];
	var reader = new FileReader();

	reader.onloadend = function () {
		preview.src = reader.result;
		localStorage.setItem("recent-image", reader.result);
	};

	if (file) {
		reader.readAsDataURL(file);
	} else {
		preview.src = "";
	}
	preview.removeAttribute("hidden");
	uploadFile.style.display = "none";
}
fileInput.addEventListener("change", previewFile);
