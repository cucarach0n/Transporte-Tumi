<template>
  <footer class="bg-premium-black relative border-t border-dark-gray mt-12">
    <!-- Red block overlapping the footer on the right -->
    <div class="hidden lg:flex absolute right-0 top-0 h-full w-1/3 bg-corp-red z-0 rounded-tl-[100px] items-center justify-center p-8 overflow-hidden">
      <!-- Decoración de mapa -->
      <div class="absolute right-[-20%] bottom-[-20%] opacity-20">
        <svg class="w-64 h-64 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      </div>
      <div class="relative z-10 text-neutral-white">
        <h2 class="font-heading font-bold text-3xl xl:text-4xl leading-tight mb-2">JUNÍN NOS MUEVE, <br/> EL PERÚ NOS CONECTA.</h2>
        <p class="font-sans text-lg text-white/90">Tu viaje, nuestro compromiso.</p>
      </div>
    </div>

    <!-- Red block for mobile (stacked) -->
    <div class="lg:hidden bg-corp-red p-8 flex items-center justify-center relative overflow-hidden">
      <div class="relative z-10 text-neutral-white text-center">
        <h2 class="font-heading font-bold text-2xl leading-tight mb-2">JUNÍN NOS MUEVE, <br/> EL PERÚ NOS CONECTA.</h2>
        <p class="font-sans text-base text-white/90">Tu viaje, nuestro compromiso.</p>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:pr-[35%]">
        
        <!-- Flota Moderna -->
        <div class="flex gap-4">
          <div class="text-modern-gold shrink-0">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v8c0 .6.4 1 1 1h2m10 0c0 1.1-.9 2-2 2s-2-.9-2-2m4 0h-4m-6 0c0 1.1-.9 2-2 2s-2-.9-2-2m4 0H5"></path></svg>
          </div>
          <div>
            <h4 class="font-heading font-bold text-modern-gold text-sm uppercase mb-1">FLOTA MODERNA</h4>
            <p class="text-xs text-light-gray font-sans leading-relaxed">Unidades cómodas, seguras y en excelente estado.</p>
          </div>
        </div>

        <!-- Conductores Profesionales -->
        <div class="flex gap-4">
          <div class="text-modern-gold shrink-0">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 11l3-3m0 0l3 3m-3-3v8"></path></svg>
          </div>
          <div>
            <h4 class="font-heading font-bold text-modern-gold text-sm uppercase mb-1">CONDUCTORES PROFESIONALES</h4>
            <p class="text-xs text-light-gray font-sans leading-relaxed">Experiencia, responsabilidad y vocación de servicio.</p>
          </div>
        </div>

        <!-- Atención Personalizada -->
        <div class="flex gap-4">
          <div class="text-modern-gold shrink-0">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
          </div>
          <div>
            <h4 class="font-heading font-bold text-modern-gold text-sm uppercase mb-1">ATENCIÓN PERSONALIZADA</h4>
            <p class="text-xs text-light-gray font-sans leading-relaxed">Te asesoramos en cada etapa de tu viaje.</p>
          </div>
        </div>

        <!-- Cobertura Total -->
        <div class="flex gap-4">
          <div class="text-modern-gold shrink-0">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </div>
          <div>
            <h4 class="font-heading font-bold text-modern-gold text-sm uppercase mb-1">COBERTURA TOTAL</h4>
            <p class="text-xs text-light-gray font-sans leading-relaxed">Llegamos donde nos necesites.</p>
          </div>
        </div>

      </div>

      <div class="border-t border-dark-gray mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 lg:pr-[35%]">
        <p class="text-sm text-gray-500 font-sans text-center md:text-left">
          &copy; {{ new Date().getFullYear() }} Transporte Turístico Tumi de Oro. Todos los derechos reservados.
        </p>
        <div class="flex space-x-4">
          <a href="#" class="text-gray-500 hover:text-corp-red transition-colors">
            <span class="sr-only">Facebook</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
