class FlightsController < ApplicationController
  def index
    render json: Flight.all
  end

  def show
    flight = Flight.find(params[:id])

    render json: flight, include: {
      # When you give me a flight, include the .airplane and reservation associations
      airplane: {},
      reservations: {
        only: [:row, :col, :user_id],
        include: {
          # ...and when you give me each reservation for a flight, ALSO give me the 
          # nexted .user belongs_to association for each reservation
          user: {
            # except: [:password_digest]
            only: [:name]
          }
        }
      } #reservations
    } #top level include for flight
  end

  def search
    flights = Flight.where origin: params[:origin], destination: params[:destination]

    render json: flights, include: {
      airplane: {
        only: [:name]
      }
    }
  end


end
