package net.emsi.inventoryservice.repository;

import com.fasterxml.jackson.databind.node.LongNode;
import net.emsi.inventoryservice.entities.Terrain;
import net.emsi.inventoryservice.entities.TerrainStatus;
import net.emsi.inventoryservice.entities.TerrainType;
import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;

//@RepositoryRestResource  Il genere par default un webService
public interface TerrainRepository extends JpaRepository<Terrain, Long> {
    List<Terrain> findByClubCode(String code);
    List<Terrain> findByStatus(TerrainStatus status);
    List<Terrain> findByType(TerrainType type);
}
