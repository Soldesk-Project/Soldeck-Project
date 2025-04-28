document.addEventListener("DOMContentLoaded", () => {
  fetch("/friendlist/randomProfiles?count=24")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("miniProfileContainer");
      data.forEach(profile => {
        const profileDiv = document.createElement("div");
        profileDiv.className = "miniProfile";
        profileDiv.innerHTML = `
          <div class="profile_image">
            <input type="image" alt="profileImg" src="${profile.img || '/resources/images/profile.png'}">
          </div>
          <div class="profile_nick">
            <span>${profile.nick}</span>
          </div>
        `;
        container.appendChild(profileDiv);
      });
    });
});