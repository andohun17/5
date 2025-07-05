// script.js
document.addEventListener("DOMContentLoaded", function() {
  // 디자인 목록
  const glasses = [
    { name: "Classic Glasses", src: "assets/glasses/classic.png" },
    { name: "Round Glasses", src: "assets/glasses/round.png" }
  ];
  const sunglasses = [
    { name: "Aviator", src: "assets/sunglasses/aviator.png" },
    { name: "Retro", src: "assets/sunglasses/retro.png" }
  ];

  let selectedCategory = null;
  let selectedDesign = null;

  // 카테고리 선택 버튼 클릭 이벤트
  document.getElementById("glasses-btn").addEventListener("click", function() {
    selectedCategory = 'glasses';
    showDesigns(selectedCategory);
  });

  document.getElementById("sunglasses-btn").addEventListener("click", function() {
    selectedCategory = 'sunglasses';
    showDesigns(selectedCategory);
  });

  // 디자인 선택 화면 보여주기
  function showDesigns(category) {
    const designSelection = document.getElementById("design-selection");
    designSelection.classList.remove("hidden"); // 디자인 선택 화면 보이게

    // 디자인 목록을 해당 카테고리에서 가져오기
    const designs = category === 'glasses' ? glasses : sunglasses;
    designSelection.innerHTML = ""; // 기존 디자인 목록 초기화

    designs.forEach(item => {
      const img = document.createElement("img");
      img.src = item.src;  // 이미지 경로
      img.alt = item.name; // 이미지 이름
      img.addEventListener("click", function() {
        selectedDesign = item;  // 선택한 디자인 저장
        startWebcam();  // 웹캠 화면 시작
      });
      designSelection.appendChild(img);  // 선택된 디자인을 화면에 추가
    });
  }

  // 웹캠 화면 시작
  function startWebcam() {
    document.getElementById("webcam-container").classList.remove("hidden");  // 웹캠 화면 보이기

    const webcamContainer = document.getElementById("webcam-container");
    const video = document.createElement("video");
    webcamContainer.appendChild(video);

    // 웹캠 권한 요청 및 비디오 스트림 시작
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function(stream) {
        video.srcObject = stream;
        video.play();
        detectFace(video);  // 얼굴 인식 및 오버레이 적용
      })
      .catch(function(err) {
        console.error("Webcam not available:", err);
      });
  }

  // 얼굴 인식 및 선택된 디자인(안경) 오버레이
  function detectFace(video) {
    const overlay = document.getElementById("overlay");
    const img = document.createElement("img");
    img.src = selectedDesign.src;  // 선택된 안경 이미지
    overlay.appendChild(img);

    // 임의로 안경 위치 조정 (이 부분은 나중에 얼굴 인식 후 정확한 위치로 조정 가능)
    img.style.position = 'absolute';
    img.style.top = '30%';  // 임의로 설정된 위치 (얼굴 인식 후 위치 조정)
    img.style.left = '50%';
    img.style.transform = 'translate(-50%, -50%)';
    overlay.classList.remove("hidden");  // 오버레이 보이게
  }
});
