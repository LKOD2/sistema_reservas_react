import React from "react"

export function Inicio (){
    return(
        
        <div class="contenido">

            <div class="titulo-contenido">
                <i class='bx bxs-home-alt-2'></i>
                <h4>Inicio</h4>
            </div>

            <div class="data-habitaciones" id="habitaciones-container">
                <div class="habitacion disponible">
                    <div class="cont-numero-tipo">
                        <div>
                            <div class="numero">1</div>
                        </div>
                        <div class="icono">
                            <i class='bx bxs-bed'></i>
                        </div>
                    </div>
                    
                    <div class="estado">
                        <p>Disponibles</p>
                        <i class='bx bxs-chevron-right'></i>
                    </div>
                    
                </div>
                <div class="habitacion ocupada">
                    <div class="cont-numero-tipo">
                        <div>
                            <div class="numero">1</div>
                        </div>
                        <div class="icono">
                            <i class='bx bxs-bed'></i>
                        </div>
                    </div>
                    
                    <div class="estado">
                        <p>Ocupadas</p>
                        <i class='bx bxs-chevron-right'></i>
                    </div>
                    
                </div>
                <div class="habitacion limpieza">
                    <div class="cont-numero-tipo">
                        <div>
                            <div class="numero">1</div>
                        </div>
                        <div class="icono">
                            <i class='bx bxs-bed'></i>
                        </div>
                    </div>
                    
                    <div class="estado">
                        <p>Limpieza</p>
                        <i class='bx bxs-chevron-right'></i>
                    </div>
                    
                </div>
                <div class="habitacion todas">
                    <div class="cont-numero-tipo">
                        <div>
                            <div class="numero">1</div>
                        </div>
                        <div class="icono">
                            <i class='bx bxs-bed'></i>
                        </div>
                    </div>
                    
                    <div class="estado">
                        <p>Todas</p>
                        <i class='bx bxs-chevron-right'></i>
                    </div>
                    
                </div>

            </div>

        </div>


    )
}

