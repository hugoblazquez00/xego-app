const API_BASE_URL = '/api'; // Base URL para las API

export const fetchFiles = async (projectId) => {
  const response = await fetch(`${API_BASE_URL}/files?projectID=${projectId}`);
  if (!response.ok) {
    throw new Error('Error fetching files');
  }
  return await response.json();
};

export const fetchFile = async (projectId, filename) => {
  const response = await fetch(`${API_BASE_URL}/files?projectID=${projectId}&fileName=${filename}`);  
  if (!response.ok) {
    throw new Error('Error fetching files');
  }
  return await response.json();
};

export const fetchXegoFiles = async (projectId) => {

  const projectDetails = await fetchProjectDetails(projectId);
  const idXego = projectDetails[0]?.idxego; 
  const response = await fetch(`${API_BASE_URL}/xegofiles?xegoID=${idXego}`);

  if (!response.ok) {
    throw new Error('Error fetching xego files');
  }
  return await response.json();
};
export const fetchXegoFile = async (projectId, filename) => {
  const projectDetails = await fetchProjectDetails(projectId);
  const idXego = projectDetails[0]?.idxego; 
  console.log("idxego",filename)
  const response = await fetch(`${API_BASE_URL}/xegofiles?xegoID=${idXego}&fileName=${filename}`);
  if (!response.ok) {
    throw new Error('Error fetching files');
  }
  return await response.json();
};

export const createFile = async (projectId, name, path, type) => {
  const response = await fetch(`${API_BASE_URL}/files`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idproject: projectId,
      name,
      path,
      type,
      ...(type === 'file' ? { content: '', language: 'javascript' } : {}),
    }),
  });
  if (!response.ok) {
    throw new Error('Error creating file/folder');
  }
  return await response.json();
};

export const deleteFile = async (fileId) => {
  const response = await fetch(`${API_BASE_URL}/files?fileId=${fileId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Error deleting file');
  }
  return await response.json();
};

export const fetchProjects = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/projects?userID=${userId}`);
  if (!response.ok) {
    throw new Error('Error fetching projects');
  }
  return await response.json();
};

export const fetchProjectDetails = async (projectId) => {
  const response = await fetch(`${API_BASE_URL}/projects?projectID=${projectId}`);
  if (!response.ok) {
    throw new Error('Error fetching project details');
  }
  return await response.json();
};

export const fetchXegoDetails = async (xegoId) => {
  const response = await fetch(`${API_BASE_URL}/xegos?xegoID=${xegoId}`)
  if (!response.ok) {
    throw new Error('Error fetching project details');
  }
  return await response.json();
};

export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users`);
  if (!response.ok) {
    throw new Error('Error fetching users');
  }
  return await response.json();
};

export const verifyUser = async (userId) => {
  const response = await fetch(`${API_BASE_URL}/users?userId=${userId}`);
  if (!response.ok) {
    throw new Error('User verification error');
  }
  return await response.json();
};
