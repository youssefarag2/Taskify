// prisma/seed.ts
import prisma from "../src/config/prisma";
// Or, if you export your Prisma client instance from a specific file (like your src/config/prisma.ts),
// you might import it like this:
// import prisma from '../src/config/prisma'; // Adjust path if your seed.ts is in root/prisma/

// const prisma = new PrismaClient(); // Use this if you don't have a globally exported instance

// The ID of an EXISTING user you want to add tasks for
const userIdForSeed = "3cd2aef6-aace-44ac-b134-fe1f9e42b721";

async function main() {
  console.log(`Start seeding tasks for user ID: ${userIdForSeed}...`);

  // Optional: Verify the user exists before trying to add tasks for them
  const user = await prisma.user.findUnique({
    where: { id: userIdForSeed },
  });

  if (!user) {
    console.error(
      `Error: User with ID ${userIdForSeed} not found. Please create this user first or use an existing user ID.`
    );
    return; // Stop seeding if user doesn't exist
  }

  const fillerTasksData = [
    {
      title: "Grocery Shopping",
      description: "Buy milk, eggs, bread, and cheese.",
    },
    {
      title: "Book Doctor Appointment",
      description: "Schedule a check-up for next week.",
    },
    {
      title: "Finish Project Report",
      description: "Complete the final sections and proofread.",
    },
    {
      title: "Pay Bills",
      description: "Electricity, internet, and credit card bills due.",
    },
    { title: "Plan Weekend Trip", description: null }, // Example with no description
    {
      title: "Workout Session",
      description: "30 minutes of cardio and strength training.",
    },
    { title: "Read Chapter 5", description: "Of 'The Pragmatic Programmer'." },
    { title: "Call Mom", description: "Check in and see how she's doing." },
    {
      title: "Water the plants",
      description: "Living room and balcony plants.",
    },
    { title: "Organize Desk", description: "Clear clutter and sort papers." },
  ];

  // Create tasks for the specified user
  for (const taskData of fillerTasksData) {
    try {
      const task = await prisma.task.create({
        data: {
          title: taskData.title,
          description: taskData.description,
          // 'completed' will default to false based on your Prisma schema
          // (if it has `@default(false)`)
          // Otherwise, explicitly set it:
          completed: false,
          userId: userIdForSeed,
          // Prisma will automatically generate the 'id' for the task
          // if your schema.prisma defines it with @default(uuid()), @default(cuid()), or as an autoincrementing Int.
        },
      });
      console.log(`Created task: "${task.title}" with id: ${task.id}`);
    } catch (error) {
      console.error(`Failed to create task "${taskData.title}":`, error);
      // Decide if you want to stop seeding on error or continue
    }
  }

  console.log("Seeding finished.");
}

main()
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    // Ensure Prisma Client is disconnected when script finishes or errors
    await prisma.$disconnect();
  });
