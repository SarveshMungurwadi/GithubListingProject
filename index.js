// function getRepositories() {
//     const username = document.getElementById('username').value;
//     const perPage = 10; // Default per page
//     const reposContainer = document.getElementById('repositories');

//     // Clear previous results
//     reposContainer.innerHTML = '';

//     // Show loading spinner
//     reposContainer.innerHTML = '<div class="spinner-border text-primary" role="status"></div>';

//     // GitHub API URL for user details
//     const userApiUrl = `https://api.github.com/users/${username}`;
    
//     // GitHub API URL for repositories
//     const reposApiUrl = `https://api.github.com/users/${username}/repos?per_page=${perPage}`;

//     // Make Fetch API call for user details
//     fetch(userApiUrl)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(user => {
//             // Make Fetch API call for repositories
//             fetch(reposApiUrl)
//                 .then(response => {
//                     if (!response.ok) {
//                         throw new Error('Network response was not ok');
//                     }
//                     return response.json();
//                 })
//                 .then(repositories => {
//                     // Render user details and repositories
//                     renderUserDetails(user);
//                     renderRepositories(repositories);
//                     // renderPagination(user);
//                 })
//                 .catch(error => {
//                     // Handle error
//                     reposContainer.innerHTML = '<p class="text-danger">Error fetching repositories. Please check the username.</p>';
//                 });
//         })
//         .catch(error => {
//             // Handle error
//             reposContainer.innerHTML = '<p class="text-danger">Error fetching user details. Please check the username.</p>';
//         });
// }

// function renderUserDetails(user) {
//     const userContainer = document.getElementById('user-details');
//     userContainer.innerHTML = `
//         <div class="card mb-4">
//             <img src="${user.avatar_url}" class="card-img-top" alt="Profile Photo">
//             <div class="card-body">
//                 <h5 class="card-title">${user.name || user.login}</h5>
//                 <p class="card-text">${user.location || 'Location not available'}</p>
//                 <a href="${user.html_url}" target="_blank" class="btn btn-primary">View on GitHub</a>
//             </div>
//         </div>
//     `;
// }

// function renderRepositories(repositories) {
//     const reposContainer = document.getElementById('repositories');
    
//     if (repositories.length === 0) {
//         reposContainer.innerHTML = '<p class="text-info">No repositories found.</p>';
//         return;
//     }

//     const repoList = document.createElement('ul');
//     repoList.className = 'list-group';

//     repositories.forEach(repo => {
//         const listItem = document.createElement('li');
//         listItem.className = 'list-group-item';
//         listItem.innerHTML = `
//             <h5>${repo.name}</h5>
//             <p>${repo.description || 'No description available.'}</p>
//             <span class="badge badge-primary">${repo.language}</span>
//             <a href="${repo.html_url}" target="_blank" class="btn btn-sm btn-info mt-2">View on GitHub</a>
//         `;
//         repoList.appendChild(listItem);
//     });

//     // Append the list to the container
//     reposContainer.innerHTML = '';
//     reposContainer.appendChild(repoList);
// }
// function renderPagination() {
//     const paginationContainer = document.getElementById('pagination');
//     const totalPages = Math.ceil(reposContainer.dataset.total / perPage);

//     // Clear previous pagination
//     paginationContainer.innerHTML = '';

//     // Previous button
//     const prevButton = document.createElement('button');
//     prevButton.className = 'btn btn-outline-secondary mr-2';
//     prevButton.innerText = 'Previous';
//     prevButton.disabled = currentPage === 1;
//     prevButton.addEventListener('click', () => {
//         if (currentPage > 1) {
//             currentPage--;
//             getRepositories();
//         }
//     });

//     // Next button
//     const nextButton = document.createElement('button');
//     nextButton.className = 'btn btn-outline-secondary';
//     nextButton.innerText = 'Next';
//     nextButton.disabled = currentPage === totalPages;
//     nextButton.addEventListener('click', () => {
//         if (currentPage < totalPages) {
//             currentPage++;
//             getRepositories();
//         }
//     });

//     // Current page counter
//     const pageCounter = document.createElement('span');
//     pageCounter.innerText = `Page ${currentPage} of ${totalPages}`;

//     // Append buttons and counter to the pagination container
//     paginationContainer.appendChild(prevButton);
//     paginationContainer.appendChild(pageCounter);
//     paginationContainer.appendChild(nextButton);
// }










let currentPage = 1;
const perPage = 10; // Default per page

function getRepositories() {
    const username = document.getElementById('username').value;
    const reposContainer = document.getElementById('repositories');

    // Clear previous results
    reposContainer.innerHTML = '';

    // Show loading spinner
    reposContainer.innerHTML = '<div class="spinner-border text-primary" role="status"></div>';

    // GitHub API URL for user details
    const userApiUrl = `https://api.github.com/users/${username}`;
    
    // GitHub API URL for repositories
    const reposApiUrl = `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${currentPage}`;

    // Make Fetch API call for user details
    fetch(userApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(user => {
            // Make Fetch API call for repositories
            fetch(reposApiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(repositories => {
                    // Render user details and repositories
                    renderUserDetails(user);
                    renderRepositories(repositories);
                    renderPagination();
                })
                .catch(error => {
                    // Handle error
                    reposContainer.innerHTML = '<p class="text-danger">Error fetching repositories. Please check the username.</p>';
                });
        })
        .catch(error => {
            // Handle error
            reposContainer.innerHTML = '<p class="text-danger">Error fetching user details. Please check the username.</p>';
        });
}

function renderUserDetails(user) {
    const userContainer = document.getElementById('user-details');
    userContainer.innerHTML = `
        <div class="card mb-4 list-group list-group-horizontal-md">
            <img src="${user.avatar_url}" class="img-thumbnail w-25 rounded-circle img-fluid" alt="Profile Photo">
            <div class="card-body">
                <h5 class="card-title">${user.name || user.login}</h5>
                <p class="card-text">${user.location || 'Location not available'}</p>
                <p class="card-text">${user.bio || 'Bio not available'}</p>
                <a href="${user.html_url}" target="_blank" class="btn btn-primary">View on GitHub</a>
            </div>
        </div>
    `;
}

function renderRepositories(repositories) {
    const reposContainer = document.getElementById('repositories');
    
    if (repositories.length === 0) {
        reposContainer.innerHTML = '<p class="text-info">No repositories found.</p>';
        return;
    }

    const repoList = document.createElement('ul');
    repoList.className = 'list-group';

    repositories.forEach(repo => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.innerHTML = `
            <h5>${repo.name}</h5>
            <p>${repo.description || 'No description available.'}</p>
            <span class="badge badge-primary">${repo.language}</span>
            <a href="${repo.html_url}" target="_blank" class="btn btn-sm btn-info mt-2">View on GitHub</a>
        `;
        repoList.appendChild(listItem);
    });

    // Append the list to the container
    reposContainer.innerHTML = '';
    reposContainer.appendChild(repoList);
}

function renderPagination() {
    const paginationContainer = document.getElementById('pagination');
    
    if (paginationContainer) {
        paginationContainer.innerHTML = `
            <nav aria-label="Repository navigation">
                <ul class="pagination">
                    <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
                        <a class="page-link" href="#" onclick="navigatePage(${currentPage - 1})">Older</a>
                    </li>
                    <li class="page-item">
                        <span class="page-link">${currentPage}</span>
                    </li>
                    <li class="page-item">
                        <a class="page-link" href="#" onclick="navigatePage(${currentPage + 1})">Newer</a>
                    </li>
                </ul>
            </nav>
        `;
    }
}

function navigatePage(page) {
    if (page >= 1) {
        currentPage = page;
        getRepositories();
    }
}
