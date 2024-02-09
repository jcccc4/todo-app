import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import React from 'react'
import AddTodo from './_actions/AddTodo';
import TodoList from './TodoList';
import { getServerSession } from 'next-auth';
import { getData } from '../../data-access/todoActions';

async function Page() {
    const session = await getServerSession();
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: getData,
  });

  if (session) {
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <AddTodo />
        <TodoList />
      </HydrationBoundary>
  )}
}

export default Page;