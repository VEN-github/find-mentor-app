<template>
  <section class="mt-8 md:mt-12 xl:mt-16">
    <div
      class="flex justify-between flex-col gap-6 container h-full mx-auto mb-8 px-8 sm:gap-10 md:gap-16 md:mb-16 lg:flex-row"
    >
      <div
        class="flex justify-center flex-col sm:text-center lg:text-left lg:py-12 xl:py-24 xl:w-5/12"
      >
        <p
          class="mb-4 font-semibold text-secondaryBg md:mb-6 md:text-lg xl:text-xl"
        >
          We're glad you're here
        </p>
        <h1
          class="mb-8 text-4xl font-bold text-primaryFg sm:text-5xl md:mb-12 md:text-6xl"
        >
          Discover the best mentor for you
        </h1>
        <div
          class="flex flex-col gap-4 sm:justify-center sm:flex-row lg:justify-start"
        >
          <a
            href="#"
            class="inline-block px-8 py-3 text-sm font-semibold text-center bg-secondaryBg text-primaryFg rounded-lg outline-none transition duration-100 hover:opacity-75 md:text-base lg:shadow-xl"
          >
            Get Started
          </a>
          <a
            href="#"
            class="inline-block px-8 py-3 text-sm font-semibold text-center bg-primaryFg text-primaryBg bg-opacity-70 rounded-lg outline-none transition duration-100 hover:bg-opacity-100 md:text-base"
          >
            Take tour
          </a>
        </div>
      </div>
      <div
        class="overflow-hidden h-48 bg-gray-100 rounded-lg shadow-lg lg:h-auto xl:w-5/12"
      >
        <img
          src="https://images.pexels.com/photos/716276/pexels-photo-716276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          loading="lazy"
          alt="Photo by Fakurian Design"
          class="w-full h-full object-cover object-center"
        />
      </div>
    </div>
    <div class="container mx-auto px-8">
      <div
        class="flex justify-between items-center flex-col gap-10 pt-8 border-t border-secondaryFg lg:flex-row lg:gap-8"
      >
        <div
          class="grid grid-cols-2 gap-4 -mx-6 md:flex md:-mx-8 md:divide-x md:divide-secondaryFg"
        >
          <div class="px-6 md:px-8">
            <span
              class="block text-lg font-bold text-center text-secondaryBg md:text-xl md:text-left"
            >
              500+
            </span>
            <span
              class="block text-sm font-semibold text-center text-primaryFg md:text-base md:text-left"
            >
              Experienced Mentors
            </span>
          </div>
          <div class="px-6 md:px-8">
            <span
              class="block text-lg font-bold text-center text-secondaryBg md:text-xl md:text-left"
            >
              1500+
            </span>
            <span
              class="block text-sm font-semibold text-center text-primaryFg md:text-base md:text-left"
            >
              Happy Customers
            </span>
          </div>

          <div class="px-6 md:px-8">
            <span
              class="block text-lg font-bold text-center text-secondaryBg md:text-xl md:text-left"
            >
              250
            </span>
            <span
              class="block text-sm font-semibold text-center text-primaryFg md:text-base md:text-left"
            >
              Company Trusted
            </span>
          </div>
          <div class="px-6 md:px-8">
            <span
              class="block text-lg font-bold text-center text-secondaryBg md:text-xl md:text-left"
            >
              700+
            </span>
            <span
              class="block text-sm font-semibold text-center text-primaryFg md:text-base md:text-left"
            >
              Educational Content
            </span>
          </div>
        </div>
        <div class="flex justify-center items-center gap-4 lg:justify-start">
          <span
            class="font-semibold tracking-widest uppercase text-secondaryFg text-opacity-70 text-sm sm:text-base"
          >
            Social
          </span>
          <span class="w-12 h-px bg-secondaryFg bg-opacity-70"></span>
          <div class="flex items-center gap-2.5">
            <a
              href="#"
              target="_blank"
              class="text-secondaryFg text-opacity-70 transition duration-100 hover:text-opacity-100"
            >
              <Icon icon="ant-design:facebook-filled" class="text-2xl" />
            </a>
            <a
              href="#"
              target="_blank"
              class="text-secondaryFg text-opacity-70 transition duration-100 hover:text-opacity-100"
            >
              <Icon icon="ph:instagram-logo-fill" class="text-2xl" />
            </a>

            <a
              href="#"
              target="_blank"
              class="text-secondaryFg text-opacity-70 transition duration-100 hover:text-opacity-100"
            >
              <Icon icon="mdi:twitter" class="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
