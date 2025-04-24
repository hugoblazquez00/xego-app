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

export const fetchXegoFiles = async (projectId, step) => {
  const projectDetails = await fetchProjectDetails(projectId);
  const idXego = projectDetails[0]?.idxego; 
  const url = `${API_BASE_URL}/xegofiles?xegoID=${idXego}${step !== undefined ? `&step=${step}` : ''}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Error fetching xego files');
  }
  return await response.json();
};

export const fetchXegoFile = async (projectId, filename, step) => {
  const projectDetails = await fetchProjectDetails(projectId);
  const idXego = projectDetails[0]?.idxego; 
  const url = `${API_BASE_URL}/xegofiles?xegoID=${idXego}&fileName=${filename}${step !== undefined ? `&step=${step}` : ''}`;
  const response = await fetch(url);
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

export const createAiMessage = async (projectId, content, context = [], lastMessages = []) => {
  const response = await fetch(`${API_BASE_URL}/aimessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idproject: projectId,
      content,
      context,
      lastMessages
    }),
  });
  if (!response.ok) {
    throw new Error('Error creating AI message');
  }
  const data = await response.json();
  return data;
};

export const fetchAiMessages = async (projectId) => {
  const response = await fetch(`${API_BASE_URL}/aimessage?projectId=${projectId}`);
  if (!response.ok) {
    throw new Error('Error fetching AI messages');
  }
  return await response.json();
};

export const fetchInstructionByStep = async (xegoId, step) => {
  const response = await fetch(`${API_BASE_URL}/instructions?xegoId=${xegoId}`);
  if (!response.ok) {
    throw new Error('Error fetching instructions');
  }
  const allInstructions = await response.json();
  return allInstructions.find(instruction => instruction.step === step);
};

export const updateProjectStep = async (projectId, action) => {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ projectId, action }),
  });

  if (!response.ok) {
    throw new Error('Error updating project step');
  }

  return await response.json();
};

export const fetchBundle = async (projectId, currentScreen, currentStep) => {
  const url = `${API_BASE_URL}/bundle?projectID=${projectId}&screen=${currentScreen}${currentStep !== undefined ? `&step=${currentStep}` : ''}`;
  const response = await fetch(url, { method: 'POST' });
  
  if (!response.ok) {
    throw new Error('Error fetching bundle');
  }
  
  return await response.text();
};

export const executeQuery = async (schemaId, query, queryType) => {
  const response = await fetch(`${API_BASE_URL}/querySQL/${schemaId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      query,
      queryType
    }),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error executing query');
  }
  
  return await response.json();
};

export const fetchTableNames = async (schemaId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tablesView/${schemaId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching table names: ' + error.message);
  }
};

export const fetchTableData = async (schemaId, tableName) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tablesView/${schemaId}/${tableName}`, {
      method: 'POST'
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error fetching table data: ' + error.message);
  }
};
