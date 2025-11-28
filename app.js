/* -----------------------------
   1) 웹캠 초기화 (없는 경우 자동 fallback)
------------------------------ */
const video = document.getElementById("camera");

navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
  .then(stream => {
    video.srcObject = stream;
    video.style.display = "block";
  })
  .catch(err => {
    console.log("웹캠 없음 → fallback 배경 사용", err);
    video.style.display = "none";
  });

/* -----------------------------
   공통 변수
------------------------------ */
const overlay = document.getElementById("overlay");
let activeMember = null;
let activePose = null;

/* -----------------------------
   2) 메인 멤버 클릭 시 → 포즈 펼치기 + pose1 자동 선택
------------------------------ */
document.querySelectorAll(".member").forEach(member => {
  member.addEventListener("click", () => {
    const name = member.dataset.member;

    // 모든 pose-group 숨기기
    document.querySelectorAll(".pose-group").forEach(g => g.classList.add("hidden"));

    // 해당 멤버 pose-group 펼치기
    const poseGroup = document.getElementById("poses-" + name);
    poseGroup.classList.remove("hidden");

    // main active 표시
    document.querySelectorAll(".member .thumb").forEach(t => t.classList.remove("active"));
    member.querySelector(".thumb").classList.add("active");

    activeMember = name;

    // ------------------------------
    //  핵심: pose1 자동 선택!
    // ------------------------------

    // pose1 요소 찾기
    const pose1 = poseGroup.querySelector(".pose:nth-child(1)");

    if (pose1) {
      // 모든 pose active 해제
      document.querySelectorAll(".pose").forEach(p => p.classList.remove("active"));

      // pose1 활성화
      pose1.classList.add("active");

      // overlay 이미지 변경
      const file = pose1.dataset.filter;
      overlay.src = "filters/" + file;

      activePose = file;
    }
  });
});

/* -----------------------------
   3) 포즈 클릭 → 오버레이 변경
------------------------------ */
document.querySelectorAll(".pose").forEach(pose => {
  pose.addEventListener("click", () => {
    const file = pose.dataset.filter;
    overlay.src = "filters/" + file;

    // 모든 pose 비활성화
    document.querySelectorAll(".pose").forEach(p => p.classList.remove("active"));

    // 선택된 pose만 active
    pose.classList.add("active");

    activePose = file;
  });
});

/* -----------------------------
   슬라이드 패널 토글 기능
------------------------------ */
const panel = document.getElementById("filter-list");
const toggleBtn = document.getElementById("panel-toggle");

toggleBtn.addEventListener("click", () => {
  panel.classList.toggle("open");
});

