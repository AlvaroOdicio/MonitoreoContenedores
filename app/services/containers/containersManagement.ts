



export async function getAllContainers(): Promise<any> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/containers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch containers');
  }

  const json = await res.json();
  return json;
}


export async function createContainer(containerData: any): Promise<any> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/containers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(containerData),
  });

  if (!res.ok) {
    throw new Error('Failed to create container');
  }

  const json = await res.json();
  return json;
}

export async function getContainerByGuid(guid: string): Promise<any> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/containers/${guid}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    });
    
    if (!res.ok) {
        throw new Error('Failed to fetch container');
    }
    
    const json = await res.json();
    return json;
    }

export async function updateContainer(guid: string, containerData: any): Promise<any> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/containers/${guid}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(containerData),
  });

  if (!res.ok) {
    throw new Error('Failed to update container');
  }

  const json = await res.json();
  return json;
}


export async function deleteContainer(guid: string): Promise<void> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/containers/${guid}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to delete container');
  }

  return;
}


export async function bestRoute( guids: string[]): Promise<any> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/simulation/generate-simulation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ container_guids: guids })
  });

  if (!res.ok) {
    throw new Error('Failed to fetch best route');
  }

  const json = await res.json();
  return json;
}