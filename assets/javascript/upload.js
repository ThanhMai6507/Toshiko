var fileInput = document.querySelector("input[type=file]");
var uploadFile = document.querySelector(".upload");
var cancel = document.querySelector(".cancel");
var preview = document.querySelector(".upload_result");

localStorage.removeItem("recent-image");
function previewFile() {
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
	preview.style.display = "block";
	uploadFile.style.display = "none";
	file = "";
}
cancel.addEventListener("click", function () {
	preview.style.display = "none";
	uploadFile.style.display = "block";
	if ((fileInput.type = "file")) {
		fileInput.value = "";
		localStorage.removeItem("recent-image");
	}
});

fileInput.addEventListener("change", function () {
	previewFile();
});
