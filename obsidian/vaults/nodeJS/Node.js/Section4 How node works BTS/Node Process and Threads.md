
[[Section4]]

#### NODE.JS PROCESS

1. Init program
2. Exec Top-Level code
3. Require modules
4. Register callbacks
5. Start Event Loop and offload to #threadPool when a task is computationally heavy.

![[offloadingHeavyTasks.png]]

#### Thread Pool:
#threadPool is provided via the #libuv library, and it provide us with extra separate threads that are independent from the main #singleExecutionThread.
To change the size of the #threadPool use `process.env.UV_THREADPOOL_SIZE = 0`

#### Event Loop Ticks, Queues, and Priorities :![[EventLoop.png]]
![[eventLoopTicks.png]]